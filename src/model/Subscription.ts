import mongoose, {Schema, Document} from "mongoose";

export interface Subscription extends Document{
    user:Schema.Types.ObjectId[];
    plan:Schema.Types.ObjectId[];
    startDate:Date;
    endDate:Date;
    status:string;
    paymentDetails:object;

}


const subscriptionSchema = new Schema({
    user:[{type:Schema.Types.ObjectId, ref:"User", required:true}],
    plan:[{type:Schema.Types.ObjectId, ref:"Plan", required:true}],
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'active' },
    paymentDetails: {
        transactionId: { type: String },
        amount: { type: Number },
        paymentDate: { type: Date }
      }
});

const SubscriptionSchema = mongoose.model('Subscription', subscriptionSchema);
export default SubscriptionSchema;