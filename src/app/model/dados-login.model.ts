import { PortaisRotas } from "../service/portal.service";
import { DadosColaborador } from "./dados-colaborador.model";
import { Projeto } from "./projeto.model";
import { StatusRequisicoes } from "./status-requisicoes.model";

export class DadosLogin {
    grupos: {
      id_grupo_usuario: {
        id_grupo_usuario: number;
        grupo_usuario: keyof PortaisRotas;
        link?: string;
      };
    }[];
    dados: DadosColaborador;
    projetos: Projeto[];
    status_requisicoes: StatusRequisicoes;
  }
