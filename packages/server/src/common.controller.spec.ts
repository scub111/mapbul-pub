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
      const result = await controller.getAll({ filter: 'id > 100' });
      expect(result.content.length).toBe(49);
      expect(result.totalPages).toBe(1);
    });

    it('should return filtered page with pagination', async () => {
      const result = await controller.getAll({ page: 1, size: 1, filter: 'id > 100 and enName = "money"' });
      expect(result.content.length).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('should return sorted page with pagination', async () => {
      const result = await controller.getAll({ page: 1, size: 1, sort: 'name desc' });
      expect(result.content.length).toBe(1);
      expect(result.content[0].name).toBe("экология");
      expect(result.totalPages).toBe(136);
    });

    it('should return sorted and filtered page with pagination', async () => {
      const result = await controller.getAll({ page: 1, size: 1, filter: 'id > 100', sort: 'name desc' });
      expect(result.content.length).toBe(1);
      expect(result.content[0].name).toBe("экология");
      expect(result.totalPages).toBe(49);
    });
  });
});
