export interface Part<Data> {
  el: HTMLElement;
  data: Data;
}

export interface PartDefinition<Data> {
  name: string;
  init: (p: Part<Data>) => void;
}

export const registerPart = <T extends {}>(p: PartDefinition<T>, data: T) => {
  const all = Array.from(document.querySelectorAll(`[part="${p.name}"]`)) as HTMLElement[];

  for (const elem of all) {
    p.init({ el: elem, data });
  }
};
