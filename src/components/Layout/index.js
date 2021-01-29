import cn from 'classnames';
import s from './Layout.module.css';

const Layout = ({ id, title, urlBg, colorBg, children }) => {
  const classNamesDesc = cn('desc, full');

  const backgroundImg = `url(${urlBg})`;

  const layoutStylesImage = {
    backgroundImage: backgroundImg,
  };

  const layoutStyleColor = {
    background: colorBg,
  };

  const styles = !urlBg ? layoutStyleColor : layoutStylesImage;

  return (
    <section className={s.root} id={id} style={styles}>
      <div className='wrapper'>
        <article>
          <div className='title'>
            <h3>{title}</h3>
            <span className='separator'></span>
          </div>
          <div className={classNamesDesc}>{children}</div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
