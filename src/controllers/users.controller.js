const { isNotNull, sendErrorMessage } = require('../../utils/utilities');
const mongoose = require('mongoose');
const Users = require('../models/users.model');
const Vaccines = require('../models/vaccines.model');


/*************** RETURN ALL USERS ****************/

const getAllUsers = async (req, res) => {
    let vaccines = 'vaccines';
    try {
        const allUsers = await Users.find().populate(vaccines);
        if(allUsers && allUsers.length > 0) {
            res.status(200).json(allUsers);        
        } else {
            res.status(204).json({
                message: `Não existe nenhum usuário cadastrado`
            });
        }
    } catch (error) {
        sendErrorMessage(error, res, 500)
    }
    vaccines="";
};


/*************** FIND USER BY ID ****************/

const getUserById = async (req, res) => {
    let vaccines = 'vaccines';
    const userID = req.params.id;

    try {
        Users.findById({_id: userID}, (err, result) => {
            if(err) {
                return res.status(404).json({message: `Usuário não encontrado com o ID: ${userID}`});
            } else {
                return res.status(200).json(result);
            }
        }).populate(vaccines);
        
    } catch (error){
        sendErrorMessage(error, res, 500)
    }
    vaccines="";
};


/*************** CREATE USER ****************/
/******** FOR FUTURE IMPLEMENTATION *********/

/*** OBS: DATABASE FOR VACCINES STIL RELATED FOR EVERY USER*/

const createUser = async (req, res) => {
    const vaccines = req.body.vaccines.map(element => {
        return element;
    });
    const { name, cpf } = req.body;
    const newUser = new Users ({
        _id: new mongoose.Types.ObjectId(),
        name,
        cpf,
        vaccines
    });

    if(!isNotNull(obj={name, cpf})) {
        return res.status(400).json({ message: `Preencha corretamente as informações para cadastrar o Usuário!` });
    } else {
        try {
            const userSearchByCPF = await Users.findOne({cpf});
            // Verify if alredy exist an user with CPF informed at body request
            
            if(userSearchByCPF) {
                return res.status(409).json({message: "Usuário já cadastrado!"});
            } else {
                try {                    
                    await newUser.save();
                    return res.status(201).json({ message: `Usuário ${name} criado com sucesso!`})    
                } catch (error) {
                    sendErrorMessage(error, res, 500);
                };
            }
        } catch (error) {
            sendErrorMessage(error, res, 500);
        };
    };
};


/*************** DELETE USER ****************/

const deleteUser = async (req, res) => {
    const userID = req.params.id;
    
    try {
        Users.findByIdAndDelete(userID, error => {
            if(error) {
                // Verify if user ID existe at Database before deleting it

                return res.status(404).json({message: `Ususário não encontrado com o ID: ${userID}`});
            } else {
                res.status(202).json({ message: `Usuário deletado com sucesso!`});            }
            
        });
       
    } catch (error) {
        sendErrorMessage(error, res, 500)
    };
};


/*************** UPDATE USER ****************/
/************ ONLY NAME AND CPF *************/

const updateUser = async (req, res) => {
    const userID = req.params.id;
    const updateBody = { name: req.body.name, cpf: req.body.cpf };

    try {
        if(!isNotNull(updateBody)) {
            // Verify if name and CPF informed at rquest body is not null or undefined or ""
            return res.status(400).json({ message: `Preencha corretamente as informações para atualizar o Usuário!` });
        } else {
           Users.findOneAndUpdate({_id: userID, cpf: updateBody.cpf}, updateBody, {new: true}, (error, result) => {
            
                if(error || result == null) {
                    // Verify if alredy existe an user with CPF informed at request body
                    return res.status(404).json({ message: `Usuário com id ${userID} e CPF: ${updateBody.cpf} não encontrado!` });
                } else{
                    res.status(200).json({message: `Usuário atualizado com sucesso!`,result});
                };     
            });
        }; 
    } catch (error) {
        sendErrorMessage(error, res, 500)
    };
};



/*************** INCLUDE VACCINE AT USER REGISTER ****************/

const includeUserVaccines = async (req, res) => {
    const userID = req.params.id;
    const updateBody = { vaccines: req.body.vaccines };
    let update = "";
    update = {
        $set: {vaccines: req.body._id},
        $push: {vaccines: req.body.vaccines}
    };
    
    if(!isNotNull(updateBody)) {
        // Verify if Vaccine ID was informed at request body and if it is not null or undefined or ""

        return res.status(400).json({ message: `Preencha corretamente as informações para atualizar o Usuário!` });
    } else {

        Users.findOneAndUpdate({_id: userID}, update, {new: true}, (error, result) => {
        
            if(error) {
                return res.status(404).json({ message: `Usuário ou Vaccina não encontrada id ${userID}!` });
            } else{
                res.status(200).json({message: `Vacinas incluídas com sucesso!`,result});
                
            }
            
        });
    }
    update="";    
};

/*************** EXCLUDE VACCINE AT USER REGISTER ****************/

const excludeUserVaccines = async (req, res) => {
    const userID = req.params.id;
    const updateBody = { vaccines: req.body.vaccines };

    if(!isNotNull(updateBody)) {
        // Verify if Vaccine ID was informed at request body and if it is not null or undefined or ""

        return res.status(400).json({ message: `Preencha corretamente as informações para atualizar o Usuário!` });
    } else {

        Users.findOne({_id: userID}, (error, result) => {
        
            if(error) {
                return res.status(404).json({ message: `Usuário ou Vaccina não encontrada id ${userID}!` });
            } else{
                    const index = result.vaccines.indexOf(req.body.vaccines);
                    
                    if (index > -1) {
                        result.vaccines.splice(index, 1);
                        result.save();
                        res.status(200).json({message: `Vacinas incluídas com sucesso!`,result});
                    } else {
                        return res.status(404).json({message: `Vacina não encontrada registrada no usuário ${result.name}!`});
                    };  
            };
            
        });
    };
};



module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    includeUserVaccines,
    excludeUserVaccines
}