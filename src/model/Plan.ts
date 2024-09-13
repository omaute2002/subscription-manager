import mongoose, {Schema, Document} from "mongoose";

export interface Plan extends Document{
    name:string;
    price:number;
    duration:string;
    ottPlatform:Schema.Types.ObjectId[];
}

const planSchema = new Schema({
    name: {
        type:String,
        required:[true,"name is required"],
    },
    price:{
        type:Number,
        required:[true, 'price is required']
    },
    duration:{
        type:String,
        required:[true, "duration is required"],
    },
    description:{
        type:String,
        required:[true, "description is required"]
    },
    ottPlatform:[{type:Schema.Types.ObjectId, ref:"OttPlatform"}]
})

const PlanModel = mongoose.model<Plan>('Plan', planSchema);
export default PlanModel;
