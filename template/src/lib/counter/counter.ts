import { Part, PartDefinition } from '@frame';

interface Counter {
  count: number;
}

const update = (p: Part<Counter>) => {
  p.el.textContent = `Count: ${p.data.count}`;
};

export const counter: PartDefinition<Counter> = {
  name: 'counter',
  init: (p: Part<Counter>) => {
    p.el.addEventListener('click', () => {
      p.data.count++;
      update(p);
    });

    update(p);
  },
};
