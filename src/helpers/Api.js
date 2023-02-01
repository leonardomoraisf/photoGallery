import React from 'react';
import axios from 'axios';

const ApiBase = 'http://127.0.0.1/photoGalleryServer/api/v1';

const API = {

    upload:async (image, legend) => {

        const formData = new FormData();

        formData.append('image',image);
        formData.append('legend',legend);

        await fetch(ApiBase+'/photos/upload', {
            method:'POST',
            body:formData
        });
        
    },

    delete:async (id) => {
        await fetch(ApiBase+"/photo/"+id+"/delete",{
            method:'DELETE'
        });
    }
};

export default API;