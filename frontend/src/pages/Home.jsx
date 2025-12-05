import './home.css'
import Card from "../components/Card.jsx";

function Home() {
    return (
        <>
            <div className="cards">
                <Card img="/img/ankara.jpg" title="ANKARA" desc="Ankara, Türkiye'nin başkentidir. Benim memleketim ve yaşadığım şehirdir.
                Gezilecek yerleri arasında Anıtkabir, Atakule, Ankara Kalesi gibi yapılar önde gelir." color="#980077FF"/>
                <Card img="/img/istanbul.jpg" title="İSTANBUL" desc="İstanbul, medeniyetlerin beşiği olan harika bir şehirdir. Uzun yıllar boyunca Osmanlı’nın kalbi olmuştur.
                Gezilecek yerleri arasında en sevdiklerim ise İstanbul Boğazı, Dolmabahçe Sarayı ve Ayasofya Camii’dir." color="#0463A5EF"/>
                <Card img="/img/konya.jpg" title="KONYA" desc="Konya, eğitim hayatım da dahil olmak üzere 14 yıl vakit geçirdiğim bir şehirdir. Sakinliği ve huzuru ile öne çıkar.
                Gezilecek yerler arasında mutlaka Mevlana Türbesi ve Kelebekler Vadisi bulunmaktadır." color="#B16004FF"/>
                <Card img="/img/rize.jpg" title="RİZE" desc="Rize, doğasına hayran kaldığım çok kıymetli şehirlerden biridir. Yeşillik ve doğa yürüyüşlerinde hoşlandığım için
                ilgimi çeken bir il olmuştur. Ancak henüz hiç gitmedim." color="#116E02FF"/>
            </div>
        </>
    )
}

export default Home