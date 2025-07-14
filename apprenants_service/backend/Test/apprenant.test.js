import * as apprenantController from '../controllers/apprenant.controller.js';
import Apprenant from '../models/apprenant.model.js';
import Rendu from '../models/rendu.model.js';
import mongoose from 'mongoose';

jest.unstable_mockModule('../models/apprenant.model.js', () => ({
  default: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

jest.unstable_mockModule('../models/rendu.model.js', () => ({
  default: {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn()
  }
}));

describe('Apprenant Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it('should create an apprenant', async () => {
    const mockApprenant = { firstName: 'Hamza', lastName: 'Oukhatou', email: 'hamza@mail.com' };
    req.body = mockApprenant;

    Apprenant.create.mockResolvedValue(mockApprenant);

    await apprenantController.createApprenant(req, res);

    expect(Apprenant.create).toHaveBeenCalledWith(mockApprenant);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockApprenant);
  });


  // Get all
  it('should get all apprenants', async () => {
    const data = [{ firstName: 'A' }, { firstName: 'B' }];
    Apprenant.find.mockResolvedValue(data);

    await apprenantController.getAllApprenants(req, res);

    expect(Apprenant.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(data);
  });

  // Get by ID
  it('should get apprenant by id', async () => {
    const mockId = new mongoose.Types.ObjectId().toString();
    const apprenant = { _id: mockId, firstName: 'X' };
    req.params.id = mockId;
    Apprenant.findById.mockResolvedValue(apprenant);

    await apprenantController.getApprenantById(req, res);

    expect(res.json).toHaveBeenCalledWith(apprenant);
  });

  it('should return 404 if apprenant not found', async () => {
    req.params.id = '123';
    Apprenant.findById.mockResolvedValue(null);

    await apprenantController.getApprenantById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Apprenant not found' });
  });

  // Update
  it('should update apprenant', async () => {
    const updated = { firstName: 'Updated' };
    req.params.id = '123';
    req.body = updated;

    Apprenant.findByIdAndUpdate.mockResolvedValue(updated);

    await apprenantController.updateApprenant(req, res);

    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('should return 404 if apprenant not found on update', async () => {
    req.params.id = '123';
    req.body = { firstName: 'Updated' };

    Apprenant.findByIdAndUpdate.mockResolvedValue(null);

    await apprenantController.updateApprenant(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Apprenant not found' });
  });

  // Delete
  it('should delete apprenant', async () => {
    req.params.id = '123';
    Apprenant.findByIdAndDelete.mockResolvedValue();

    await apprenantController.deleteApprenant(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Apprenant deleted' });
  });

  // Assign Brief
  it('should assign brief to apprenant', async () => {
    const rendu = { apprenant: '123', brief: '456' };
    req.body = rendu;

    Rendu.create.mockResolvedValue(rendu);

    await apprenantController.assignBrief(req, res);

    expect(Rendu.create).toHaveBeenCalledWith(rendu);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(rendu);
  });

  // Submit Rendu
  it('should submit a note for rendu', async () => {
    const updated = { note: 'A+' };
    req.body = { renduId: '789', note: 'A+' };

    Rendu.findByIdAndUpdate.mockResolvedValue(updated);

    await apprenantController.submitRendu(req, res);

    expect(Rendu.findByIdAndUpdate).toHaveBeenCalledWith('789', { note: 'A+' }, { new: true });
    expect(res.json).toHaveBeenCalledWith(updated);
  });
});
