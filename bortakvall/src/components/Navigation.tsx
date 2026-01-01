
import logoTransparent from '../assets/images/logoTransparent.png'

const Navigation = () => {

	return (
		<header>
			<a href="/">
			<img src={logoTransparent} className="navigation__logo" alt="Bortakväll logo" />
			</a>
		</header>
	);
};

export default Navigation;
