const { isNotNull, sendErrorMessage } = require('../../utils/utilities');
const mongoose = require('mongoose');
const Vaccines = require('../models/vaccines.model');


/*************** FIND VACCINE BY ID ****************/

const getAllVaccines = async (req, res) => {
    try {
        const allVaccines = await Vaccines.find();
        if(allVaccines && allVaccines.length > 0) {
            res.status(200).json(allVaccines);
            
        } else {
            res.status(204).json({
                message: `Não existe nenhuma Vacina cadastrada!`
            });
        }
    } catch (error) {
        sendErrorMessage(error, res, 500)
    };
};


/*********** REGISTER VACCINE AT DADABASE ************/

const createVaccine = async (req, res) => {
    const { name, expected_date, vaccinated } = req.body;
    const newVaccine = new Vaccines ({
        _id: new mongoose.Types.ObjectId(),
        name,
        expected_date,
        vaccinated
    });

    if(!isNotNull(obj={name})) {
        // Verify if request body was informed correctly.
        // Must informe at least Name of the Vaccine.
        return res.status(404).json({ message: `Preencha corretamente as informações para cadastrar a Vacina!` });

    } else {

        try {
            await newVaccine.save();
            return res.status(201).json({ message: `Vacina ${name} cadastrada com sucesso!`})
            
        } catch (error) {
            sendErrorMessage(error, res, 500);
        };
    };
};

/*********** DELETE VACCINE AT DADABASE ************/

const deleteVaccine = async (req, res) => {
    const vaccineID = req.params.id;
    
    try {
        Vaccines.findByIdAndDelete(vaccineID, error => {
            if(error) {
                return res.status(404).json({message: `Vacina não encontrada com o ID: ${vaccineID}`});
            } else {
                res.status(202).json({ message: `Vacina depreciada e deletada com sucesso!`});            }            
        });
    } catch (error) {
        sendErrorMessage(error, res, 500)
    };
};


/*********** UPDATE VACCINE AT DADABASE *************/
/********* FOR NAME AND EXPETED DATE ONLY ***********/

const updateVaccine = async (req, res) => {
    const vaccineID = req.params.id;
    const updateBody = { name: req.body.name, expected_date: req.body.expected_date};

    try {
        if(!isNotNull(updateBody)) {
            // Verify if request body was informed correctly

            return res.status(404).json({ message: `Preencha corretamente as informações para atualizar a Vacina!`});
        } else {
            Vaccines.findOneAndUpdate({_id: vaccineID}, updateBody, {new: true}, (error, result) => {
            
                if(error) {
                    return res.status(404).json({ message: `Vacina com id ${vaccineID} não encontrado!`});
                } else{
                    return res.status(200).json({message: `Vacina atualizada com sucesso!`,result});
                }           
            });
        };
    } catch (error) {
        sendErrorMessage(error, res, 500);
    };
};


/*********** INFORM IF VACCINATED OR NOT *************/

const vaccinatedOrNot = async (req, res) => {
    const vaccineID = req.params.id;
    const updateBody = { vaccinated: req.body.vaccinated };

    const message = (updateBody.vaccinated == true) ? "Você está imunizado para está vacina!" : "Você ainda não está imunizado com está vacina!"

    try {
        if(!isNotNull(updateBody)) {
            return res.status(404).json({ message: `Preencha corretamente as informações para atualizar a Vacina!`});
        } else {
            Vaccines.findOneAndUpdate({_id: vaccineID}, updateBody, {new: true}, (error, result) => {
            
                if(error) {
                    return res.status(404).json({ message: `Vacina com id ${vaccineID} não encontrado!`});
                } else{
                    return res.status(200).json({message, result});
                }           
            });
        };
        
    } catch (error) {
        sendErrorMessage(error, res, 500);
    };
};

/*********** GET VACCINE BY ID *************/

const getVaccineById = async (req, res) => {
    const vaccineID = req.params.id;

    try {
        Vaccines.findById({_id: vaccineID}, (err, result) => {
            if(err) {
                return res.status(404).json({message: `Ususário não encontrado com o ID: ${vaccineID}`});
            } else {
                return res.status(200).json(result);
            }
        });
    } catch (error){
        sendErrorMessage(error, res, 500);
    };
};

module.exports = {
    getAllVaccines,
    createVaccine,
    deleteVaccine,
    updateVaccine,
    vaccinatedOrNot,
    getVaccineById
}