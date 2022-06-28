export class StatusRequisicoes {
    projetos: {
        titulo_curto: string;
        suprimentos_notas_fiscais: number;
    }[];
    suprimentos_notas_fiscais: number;
    suprimentos_ordens: number;
    pendentes: number;
    processar: number;
    autorizar: { [titulo_curto: string]: number };
    atendimento_pendente_usuario: number;
    demais_usuario: number;
}
