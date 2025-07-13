import Apprenant from '../models/apprenant.model.js';
import Rendu from '../models/rendu.model.js';
import axios from 'axios';

const BRIEF_SERVICE_URL = process.env.BRIEF_SERVICE_URL; 

// CRUD op

export const createApprenant = async (req, res) => {
  try {
    const apprenant = await Apprenant.create(req.body);
    res.status(201).json(apprenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllApprenants = async (req, res) => {
  const apprenants = await Apprenant.find();
  res.json(apprenants);
};

export const getApprenantById = async (req, res) => {
  const apprenant = await Apprenant.findById(req.params.id);
  if (!apprenant) return res.status(404).json({ error: 'Apprenant not found' });
  res.json(apprenant);
};

export const updateApprenant = async (req, res) => {
  const apprenant = await Apprenant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!apprenant) return res.status(404).json({ error: 'Apprenant not found' });
  res.json(apprenant);
};

export const deleteApprenant = async (req, res) => {
  await Apprenant.findByIdAndDelete(req.params.id);
  res.json({ message: 'Apprenant deleted' });
};

// Rendu 

export const assignBrief = async (req, res) => {
  const { apprenantId, briefId } = req.body;
  try {
    const rendu = await Rendu.create({
      apprenant: apprenantId,
      brief: briefId,
    });
    res.status(201).json(rendu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const submitRendu = async (req, res) => {
  const { renduId, note } = req.body;
  try {
    const rendu = await Rendu.findByIdAndUpdate(
      renduId,
      { note },
      { new: true }
    );
    res.json(rendu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRendusByApprenant = async (req, res) => {
  const { apprenantId } = req.params;
  const rendus = await Rendu.find({ apprenant: apprenantId });

  const detailedRendus = await Promise.all(
    rendus.map(async (r) => {
      try {
        const response = await axios.get(`${BRIEF_SERVICE_URL}/${r.brief}`);
        return {
          ...r.toObject(),
          briefDetails: response.data,
        };
      } catch {
        return r;
      }
    })
  );

  res.json(detailedRendus);
};
