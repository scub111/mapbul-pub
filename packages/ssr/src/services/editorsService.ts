import { BaseService } from "./BaseService";
import { Editor } from "models";
import { ENDPOINTS } from "./endpoints";
import { IEditorDTO } from "@mapbul-pub/types";

class EditorsService extends BaseService<IEditorDTO, Editor> {
  constructor() {
    super(
      ENDPOINTS.editors,
      editor => Editor.New(editor),
    )
  }
}

export const editorsService = new EditorsService();
