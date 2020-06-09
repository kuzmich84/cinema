export const createFilmsExtraContainer = () => {
  const titles = [`Top rated`, `Most commented`];
  let str = ``;
  titles.forEach((title) => {
    str += `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`;
  });

  return str;
};
