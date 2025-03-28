import { Request,Response } from "express"
import Tour from "../../models/tour.model"
import { sequelize } from "../../config/database"
import { QueryTypes } from "sequelize"

// [GET] /tours/:slugCategory
export const index = async(req:Request,res:Response)=>{

    const slugCategory = req.params.slugCategory
    // const tours = await Tour.findAll({
    //     where:{
    //         deleted:false,
    //         status:"active"
    //     },
    //     raw:true
    // })
    const tours =await sequelize.query(`
        SELECT tours.*, price * (1-discount/100) AS price_special
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE   
            categories.slug = '${slugCategory}'
            AND categories.deleted = false
            and categories.status = 'active'
            AND tours.deleted = false
            AND tours.status = 'active'
        `,{
            type:QueryTypes.SELECT
        })

    tours.forEach(item =>{
        if(item['images']){
            const images = JSON.parse(item["images"])
            item["image"] = images[0]
        }
        item["price_special"] = parseFloat(item["price_special"])
    })
    res.render('client/pages/tours/index',{
        pageTitle:"Tours",
        tours:tours
    })
}