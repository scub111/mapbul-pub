import { Test, TestingModule } from '@nestjs/testing';
import { AdminsController } from './api/admins/admins.controller'
import { AdminsService } from './api/admins/admins.service';
import { GlobalVar } from '@mapbul-pub/common';

describe('AdminsController', () => {
  let adminsController: AdminsController;

  beforeEach(async () => {
    GlobalVar.setup(`${__dirname}/.env`);
    console.log(GlobalVar.env);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [AdminsService],
    }).compile();

    adminsController = app.get<AdminsController>(AdminsController);
  });

  describe('root', () => {
    it('should return lenght', async () => {
      const result = await adminsController.getAll();
      console.log(result.length);
      expect(result.length).toBeGreaterThan(1);
    });
  });
});
