import notFound from '../assets/images/404.png'
const NotFound = () => {
	return (
		<>
			<h1>Sidan kunde inte hittas</h1>
			<p><a href="/">Tillbaka till startsidan</a></p>
			<img src={notFound} width="100%" />
		</>
	)
}

export default NotFound
