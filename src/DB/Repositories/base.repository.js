export default class BaseRepository
{
    constructor( model)
    { 
        this.model=model;
    }
    /////////////////////////////////createOneDocument/////////////////////////////////////////////////////
    createOneDocument(data)
    {
        return this.model.create(data);
    }
    //////////////////////////////////findDocumentById////////////////////////////////////////////////////////
    findDocumentById(_id)
    {
        return this.model.findById(_id);
    }
    //////////////////////////////////findOneDocument/////////////////////////////////////////////////////
     findOneDocument(filters)
    {
        return this.model.findOne(filters);
    }
    ///////////////////////////////////updateOneDocument///////////////////////////////////////////
    updateOneDocument(filters,updateData,options)
    {
        return this.model.updateOne(filters,updateData,options);
    }
    /////////////////////////////////findByIdAndUpdateDocument/////////////////////////////////////////////////////
    findByIdAndUpdateDocument(_id,updateDataوoptions)
    {
        return this.model.findByIdAndUpdate(_id,updateDataوoptions);
    }
    ///////////////////////////////findOneAndUpdateDocument//////////////////////////////////
    findOneAndUpdateDocument(filters,updateData,options)
    {
        return this.model.findOneAndUpdate(filters,updateData,options);
    }
    /////////////////////////////deleteOneDocument////////////////////////////////////////
    deleteOneDocument(filters)
    {
        return this.model.deleteOne(filters);
    }
    /////////////////////////////findByIdAndDeleteDocument////////////////////////////////////////
    findByIdAndDeleteDocument(_id,options)
    {
        return this.model.findByIdAndDelete(_id,options);
    }
    /////////////////////////////findOneAndDeleteDocument////////////////////////////////////////

    findOneAndDeleteDocument(filters,options)
    {
        return this.model.findOneAndDelete(filters,options);
    }
}