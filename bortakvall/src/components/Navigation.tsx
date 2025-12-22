
import logoTransparent from '../assets/images/logoTransparent.png'

const Navigation = () => {

	return (
		<header>
			<a href="/">
			<img src={logoTransparent} className="style__logo" alt="Godiskväll logo" />
			</a>
		</header>
	);
};

export default Navigation;
