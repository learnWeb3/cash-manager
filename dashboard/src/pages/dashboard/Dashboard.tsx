// import gearIcon from 'src/Assets/icons/gear.svg';
// import bellIcon from 'src/Assets/icons/bell.svg';

import FileUploader from "../../components/form/FileUploader";

const Dashboard = () => {

    return (
        <>
            <main>
                <div className="main-container">
                    <div>
                        <h2>Tous les fichiers</h2>
                        <div>
                            {/* <img className='icon' src={gearIcon} />
                            <img className='icon' src={bellIcon} /> */}
                        </div>
                    </div>
                    
                    <FileUploader />
                </div>
                <footer>Footer</footer>
            </main>
        </>
    );
}

export default Dashboard;