export class Vehicle {
  _id?: string;
  plate: string;
  ownerName: string;
  dniOwner: number;
  year: number;
  km: number;
  actionsId: Array<string>;
  monitoring: Array<{
    id:string,
    ult:string
  }>;
  lastmaintenance:{
    date:string,
    Textdate:string
  };
  Nextmaintenance:{
    date:string,
    Textdate:string
  };
  type:{
    id:string,
    name:string
  };


  constructor(
    _id :string = "",
    plate: string = "",
    ownerName: string = "",
    dniOwner: number = 0,
    year: number = 0,
    km: number = 0,
    actionsId: Array<string> =[],
    monitoring: Array<{
      id:string,
      ult:string
    }> =[],
    lastmaintenance:{
      date:string,
      Textdate:string
    }={
      date:"",
      Textdate:""
    },
    Nextmaintenance:{
      date:string,
      Textdate:string
    }={
      date:"",
      Textdate:""
    },
    type:{
      id:string,
      name:string
    }={
      id:"",
      name:""
    },
  ) {
    this._id = _id;
    this.plate = plate;
    this.ownerName = ownerName;
    this.dniOwner = dniOwner;
    this.year = year;
    this.km = km;
    this.actionsId = actionsId;
    this.monitoring = monitoring;
    this.lastmaintenance = lastmaintenance;
    this.Nextmaintenance = Nextmaintenance;
    this.type = type;

  }
}