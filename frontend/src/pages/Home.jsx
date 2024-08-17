import Card from "../components/home/Card";

const Home = () => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
            </div>
        </div>
    )
}

export default Home;