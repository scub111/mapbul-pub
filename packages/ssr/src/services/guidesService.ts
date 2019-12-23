import { BaseService } from "./BaseService";
import { Guide } from "models";
import { ENDPOINTS } from "./endpoints";
import { IGuideDTO } from "@mapbul-pub/types";

class GuidesService extends BaseService<IGuideDTO, Guide> {
  constructor() {
    super(
      ENDPOINTS.guides,
      guide => Guide.New(guide),
    )
  }
}

export const guidesService = new GuidesService();
