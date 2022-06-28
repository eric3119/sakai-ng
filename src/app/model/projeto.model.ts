import { DadosColaborador } from "./dados-colaborador.model";


export class Projeto {
  id_projeto: number;
  id_tp_investimento: {
    id_tp_investimento: number;
    tp_investimento: string;
  };
  id_coordenador: DadosColaborador;
  id_concedente: {
    id_instituicao: number;
    id_tp_instituicao: {
      id_tp_instituicao: number;
      tp_instituicao: string;
    };
    razao_social: string;
    cnpj: string;
    email: string;
  };
  id_executor_projeto: {
    id_executor_projeto: number;
    executor_projeto: string;
  };
  id_executor_financeiro: {
    id_instituicao: number;
    id_tp_instituicao: {
      id_tp_instituicao: number;
      tp_instituicao: string;
    };
    razao_social: string;
    cnpj: string;
    email: string;
  };
  id_tp_instrumento_contratual: {
    id_tp_instrumento_contratual: number;
    tp_instrumento_contratual: string;
  };
  id_proponente: {
    id_instituicao: number;
    id_tp_instituicao: {
      id_tp_instituicao: number;
      tp_instituicao: string;
    };
    razao_social: string;
    cnpj: string;
    email: string;
  };
  id_linha_pesquisa: {
    id_linha_pesquisa: number;
    linha_pesquisa: string;
  };
  id_area_tecnologica: {
    id_area_tecnologica: number;
    area_tecnologica: string;
  };
  dt_cad: string;
  dt_alt: string;
  processo: string;
  pt: string;
  sap: string;
  num_juridico: string;
  dt_submissao: string;
  dt_inicio_vigencia: string;
  dt_fim_vigencia: string;
  titulo: string;
  ativo: boolean;
  titulo_curto: string;
  resumo: string;
  objetivo_geral: string;
  objetivos_especificos: string;
  justificativas: string;
  resultados_esperados: string;
  beneficios_projeto: string;
  id_user_cad: number;
  id_user_alt: number;
  equipe?: any;
}
