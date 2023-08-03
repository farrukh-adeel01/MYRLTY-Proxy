module.exports = {


    friendlyName: 'Report',


    description: '',


    inputs: {
    
      month: {
        type: 'string',
        required: true
        },
      year: {
        type: 'string',
        required: true
       },
       keyword:{
        type:'string',
        
       },
       type:{
        type:'string',
        isIn: ['xls','csv']

       }
    },

    exits: {
        invalid: {
            responseType: 'badRequest',
        },
        unauthorized: {
            responseType: 'unauthorized'
        },
        forbidden: {
            responseType: 'forbidden',
        },
        serverError: {
            responseType: 'serverError',
        },
        notFound: {
            responseType: 'notFound',
        }
    },

    fn: async function (inputs,exits) {
        sails.log.debug('Running api/v1/report.js');
        try{
          
          const {status,data,headers} = await sails.helpers.request.with({
            req: this.req,
            type: 'GET',
            server: 'LOGIC',
            endpoint: 'user/report',
            params: inputs
          });
        //  this.res.set(headers);
        if(inputs.type == 'csv'){
          this.res.setHeader('Content-disposition', `attachment; filename=data.csv`);
          //this.res.setHeader('Content-Type', `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`);
          this.res.set('Content-Type', `text/csv`);
          return  this.res.status(200).send(data);
         
        }else{

          this.res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
          this.res.setHeader('Content-Type', `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`);
          //res.set('Content-Type', 'text/csv');
          this.res.status(200).send(_csv);


        }
                //this.res.attachment(`dataa.csv`);
                //var downloading = await sails.startDownload(data);
                //return this.res.send(data);
          // [exitsName] = await sails.helpers.response.with({
          //   status: status,
          //   data:data
          // });
        }
        catch(err){
          sails.log.error('error calling api/v1/report.js',  err.message);
          [exitsName, responseData] = await sails.helpers.response.with({
            status: err.response.status,
            data: err.response.data
          });
        }
        return exits[exitsName](responseData);
      }
};
