const router = require('express').Router()
const Person = require('../models/Person')
router.post('/', async (req, res) => {

    const {nome,dia,mes,ano,email} = req.body
    //Validando as informações do usuário
    if(!nome){
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }
    if(dia > 31 | dia < 1){
        res.status(422).json({error: 'O dia não pode ser maior que 31 ou menor que 1'})
        return
    }
    if(mes >= 0 | mes < 0){
        res.status(422).json({error: ' O mês inserido foi inválido, digite o mês por extenso'})
        return
    }
    

    const person = {
        nome,
        dia,
        mes,
        ano,
        email,
    } 

    try {
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida com sucesso'})
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }

})

// Lendo dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({ error: error    })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id})
        if (!person) {
            res.status(422).json({message: 'O usuário não foi encontrado' })
            return
        }
        
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error, message: ' O id digitado não foi encontrado'})
        
    }

})

//update
router.patch('/:id', async (req, res) =>{
    const id = req.params.id

    const {nome,dia,mes,ano,email} = req.body

    const person = {
        nome,
        dia,
        mes,
        ano,
        email, 
    } 
    if(!nome){
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }
    if(dia > 31 | dia < 1){
        res.status(422).json({error: 'O dia não pode ser maior que 31 ou menor que 1'})
        return
    }
    if(mes >= 0 | mes < 0){
        res.status(422).json({error: ' O mês inserido foi inválido, digite o mês por extenso'})
        return
    }
    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)
        if (updatedPerson.matchedCount === 0){
            res.status(422).json({ message: 'O usuário não foi encontrado'})
            return
        }
        res.status(200).json(person)


        
    } catch (error) {
        res.status(500).json({error: error})

        
    }



})

//delete

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id})
        if (!person) {
            res.status(422).json({message: 'O usuário não foi encontrado' })
            return
        }
        try {
            await Person.deleteOne({_id: id})
            res.status(200).json({message: ' Usuário deletado com sucesso'})
        } catch (error) {
            res.status(500).json({error: error})

        }
})

module.exports = router
