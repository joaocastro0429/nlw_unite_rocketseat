import fastify from "fastify";
import {date, z} from 'zod'
import {PrismaClient} from '@prisma/client'

const app=fastify()

const prisma=new PrismaClient ({
    log:['query']
})


app.post("/users",async(request, replay)=>{
     const createEventShema=z.object({
        title:z.string().min(4),
        details:z.string().nullable(),
        maximumAttendees:z.number().int().positive().nullable()

     })
    // fazendo a validação
    const data=createEventShema.parse(request.body)
    const event= await prisma.event.create({
        data:{
            title:data.title,
            details:data.details,
            maximumAttendees:data.maximumAttendees,
            slug:new Date().toISOString()
        }
    })

    return replay.status(201).send({eventId:event.id})


     
})


app.listen({port:3333}).then(()=>{
    console.log("run server ")
})

