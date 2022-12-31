import { Schema, model } from "mongoose";

const TDTokenSchema = new Schema(
    {
        access_token: {
            type: String,
            required: true,        
        },
        refresh_token: {
            type: String,
            required: true,        
        },
        token_type: {
            type: String,
            required: true,        
        },
        expires_in: {
            type: Number,
            required: true,        
        },
        scope: {
            type: Array,
            required: true,        
        },
        refresh_token_expires_in: {
            type: Number,
            required: true,        
        },
        
    },
    {
        timestamps: true
    }
);

const TDToken = model('TDToken', TDTokenSchema);

export default TDToken;