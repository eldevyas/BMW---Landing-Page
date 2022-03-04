import '../css/Navigation.css'


function Navigation() {
    return <div className= "navigation">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="filters">
                    <defs>
                        <filter id="blur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
                        </filter>
                    </defs>
                </svg>
                <div className="nav">
                    <a href='#'>Home</a>
                    <a href='#'>Models</a>
                    <a href='#'>About</a>
                    <a href='#'>Test Drive</a>
                </div>
            </div>;
}

export default Navigation;