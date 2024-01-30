import request from '@/utils/request.js'

export const getVisualization = () =>{
    return request ({
        url:'/chu/totalData'
    })
}