import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';

import bg1 from './assets/bg1.jpg';
import bg3 from './assets/bg3.jpg';

const layouts = [
  {
    id: '1',
    title: 'Layout 1',
    descr: 'Descr for Layout 1',
    urlBg: bg1,
    colorBg: '',
  },
  {
    id: '2',
    title: 'Layout 2',
    descr: 'Descr for Layout 2',
    urlBg: '',
    colorBg: '#f2b807',
  },
  {
    id: '3',
    title: 'Layout 3',
    descr: 'Descr for Layout 3',
    urlBg: bg3,
    colorBg: '',
  },
];

const App = () => {
  return (
    <>
      <Header title='This is Pokemons Card Game' desc='Fight or Die' />
      {layouts.map(({ id, title, descr, urlBg, colorBg }) => (
        <Layout
          key={id}
          id={id}
          title={title}
          descr={descr}
          urlBg={urlBg}
          colorBg={colorBg}
        />
      ))}
      <Footer />
    </>
  );
};

export default App;
