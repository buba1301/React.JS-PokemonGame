import s from './Layout.module.css';

const Layout = ({ id, title, descr, urlBg, colorBg }) => {
  const backgroundImg = `url(${urlBg})`;

  const layoutStylesImage = {
    backgroundImage: backgroundImg,
  };

  const layoutStyleColor = {
    background: colorBg,
  };

  const styles = urlBg === '' ? layoutStyleColor : layoutStylesImage;

  return (
    <section className={s.root} id={id} style={styles}>
      <div className='wrapper'>
        <article>
          <div className='title'>
            <h3>{title}</h3>
            <span className='separator'></span>
          </div>
          <div className='desc full'>
            <p>{descr}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
