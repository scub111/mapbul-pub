import { BaseService } from "./BaseService";
import { Journalist } from "models";
import { ENDPOINTS } from "./endpoints";
import { IJournalistDTO } from "@mapbul-pub/types";

class JournalistsService extends BaseService<IJournalistDTO, Journalist> {
  constructor() {
    super(
      ENDPOINTS.journalists,
      journalist => Journalist.New(journalist),
    )
  }
}

export const journalistsService = new JournalistsService();
