import {RadioGroup, Radio} from "@nextui-org/react";

export default function ListadoPaisesComponent() {
  return (
    <card className="items-center">
    <RadioGroup
      color="warning"
      orientation="horizontal"
    >
      <Radio value="mid" description="... ">Mérida</Radio>
      <Radio value="valla" description="... ">Valladolid</Radio>
      <Radio value="tizimin" description="... ">Tizimin</Radio>
      <Radio value="progro" description="... ">Progreso</Radio>
      <Radio value="uman" description="... ">Uman</Radio>
    </RadioGroup>
    </card>
  );
}
