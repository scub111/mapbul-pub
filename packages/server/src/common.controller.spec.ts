import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './api/categories/categories.controller';
import { CategoriesService } from './api/categories/categories.service';
import { GlobalVar } from '@mapbul-pub/common';

describe('AdminsController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    GlobalVar.setup(`${__dirname}/.env`);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = app.get<CategoriesController>(CategoriesController);
  });

  describe('root', () => {
    it('should return all data', async () => {
      const result = await controller.getAll({
        page: undefined,
        size: undefined,
      });
      expect(result.content.length).toBe(136);
      expect(result.totalPages).toBe(1);
    });

    it('should return first page', async () => {
      const result = await controller.getAll({ page: 1, size: 10 });
      expect(result.content.length).toBe(10);
      expect(result.totalPages).toBe(14);
    });

    it('should return filtered page', async () => {
      const result = await controller.getAll({ page: 1, size: 10 });
      expect(result.content.length).toBe(10);
      expect(result.totalPages).toBe(14);
    });


  });
});
