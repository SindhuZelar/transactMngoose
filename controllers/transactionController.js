const Instance = require('../models/instance');
const Bonus = require('../models/bonus');
const mongoose = require('mongoose');

async function processTransaction(instanceId, bonusId, player) {
  const session = await mongoose.startSession({ readPreference: { mode: "primary" } });
  session.startTransaction({ readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });
  
  const lockId = new mongoose.Types.ObjectId(); 
  try {
    
    const instance = await Instance.findOneAndUpdate(
      { instanceId: instanceId, status: 'pending', lockId: null },
      { $set: { lockId: lockId } }, // Set the lockId
      { new: true, session }
    );

    if (!instance) {
      throw new Error('Instance not found or already locked');
    }

    // Proceed with business logic (e.g., bonus handling)
    const bonus = await Bonus.findOne({ bonusId: bonusId }).session(session);
    if (!bonus) {
      throw new Error('Bonus not found');
    }

    // Simulate some processing
    instance.count += 1;
    await instance.save({ session });

    // If everything is successful, clear the lock and commit the transaction
    await Instance.findOneAndUpdate(
      { instanceId: instanceId },
      { $set: { lockId: null } }, // Clear the lockId
      { session }
    );

    await session.commitTransaction();
    console.log('Transaction successful');
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction failed:', error);
  } finally {
    session.endSession();
  }
}

module.exports = { processTransaction };
