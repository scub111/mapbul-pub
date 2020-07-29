import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './api/categories/categories.controller';
import { CategoriesService } from './api/categories/categories.service';
import { GlobalVar, dbConnectionSingleton } from '@mapbul-pub/common';

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

  afterAll (async () => {
    const connection = dbConnectionSingleton.getInstance();
    connection.disconnect();
  });

  describe('root', () => {
    it('should return all data', async () => {
      const result = await controller.getAll({
        page: undefined,
        size: undefined,
      });
      expect(result.totalElements).toBeGreaterThan(136);
      expect(result.content.length).toBe(result.totalElements);
      expect(result.totalPages).toBe(1);
    });

    it('should return first page', async () => {
      const result = await controller.getAll({ page: 1, size: 10 });
      expect(result.content.length).toBe(10);
      expect(result.totalElements).toBeGreaterThan(136);
      expect(result.totalPages).toBe(14);
    });

    it('should return filtered page', async () => {
      const result = await controller.getAll({ filter: 'id > 100' });
      expect(result.content.length).toBeGreaterThanOrEqual(48);
      expect(result.totalElements).toBeGreaterThan(50);
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
      expect(result.content[0].name).toBe('экология');
      expect(result.totalPages).toBeGreaterThanOrEqual(136);
    });

    it('should return sorted and filtered page with pagination', async () => {
      const result = await controller.getAll({ page: 1, size: 1, filter: 'id > 100', sort: 'name desc' });
      expect(result.content.length).toBe(1);
      expect(result.content[0].name).toBe('экология');
      expect(result.totalPages).toBeGreaterThanOrEqual(49);
    });

    it('should return filtered page by one id', async () => {
      const result = await controller.getAll({ id: '107' });
      expect(result.content.length).toBe(1);
      expect(result.content.length).toBe(result.totalElements);
      expect(result.content[0].name).toBe('извержение');
      expect(result.totalPages).toBe(1);
    });

    it('should return filtered page by one id as array', async () => {
      const result = await controller.getAll({ id: ['107'] });
      expect(result.content.length).toBe(1);
      expect(result.content.length).toBe(result.totalElements);
      expect(result.content[0].name).toBe('извержение');
      expect(result.totalPages).toBe(1);
    });

    it('should return filtered page by several ids as array', async () => {
      const result = await controller.getAll({ id: ['107', '108'] });
      expect(result.content.length).toBe(2);
      expect(result.content.length).toBe(result.totalElements);
      expect(result.content[0].name).toBe('извержение');
      expect(result.content[1].name).toBe('катаклизмы');
      expect(result.totalPages).toBe(1);
    });
  });
});
