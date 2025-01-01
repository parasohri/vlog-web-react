import conf from "../conf/confi";
import { Client,ID,Databases,Storage,Query } from "appwrite";
export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug, CONTENT,IMAGE,status,userId}){
        try{
            console.log(conf.appwriteDatabaseId);
            console.log(conf.appwriteCollectionId);
            
            
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                CONTENT,
                IMAGE,
                status,
                userId
            } )
        }
        catch(error){
console.log( "ssx",error );

        }
    }
    async updatepost(slug,{title, CONTENT,IMAGE,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                 CONTENT,
                IMAGE,
                status}

            )
            
        } catch (error) {
            console.log("while updatingpost",error);
            
        }
    }
    async deletepost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,conf.appwriteCollectionId,slug
            )
        } catch (error) {
            console.log("while deleting post",error);
            
        }
    }
    async  getpost(slug){
        try {
            return await this.databases.getDocument( conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("error while getting post",error);
            
        }
    }
    async getposts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("error while getting posts",error);
            
        }
    }
    async uploadfile(file){
try {
    return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
    )
} catch (error) {
    console.log("error while uploading file",error);
    
}
    }
    async deletefile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("error while deleting file",error);
            return false;
        }
    }
    getFilePreview(fileId){
        //console.log(fileId);
        
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}



const service=new Service();
export default service