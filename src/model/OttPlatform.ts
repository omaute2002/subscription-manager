import mongoose,{Schema, Document} from "mongoose";

export interface OttPlatform extends Document{
    name: string;
    description:string;
    logoUrl:string;
    website:string;
    plans:Schema.Types.ObjectId[];
}


const ottPlatformSchema = new Schema({
    name:{
        type:String,
        required:[true, "name of platform is required"]
    },
    description:{
        type:String,
    },
    logoUrl:{
        type:String,
        required:[true, "Url is required"],
    },
    website:{
        type:String,
        required:[true, "website url required"],
    },
    plans:[{type:Schema.Types.ObjectId, ref:"Plan"}]
})

const OttPlatformModel = mongoose.model<OttPlatform>("OttPlatform", ottPlatformSchema);
export default OttPlatformModel;