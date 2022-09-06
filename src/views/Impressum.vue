<template>
  <AppLayout clean>
    <div class="impressum">
      <h1>Impressum</h1>
      <h2>Welt der Wunder Sendebetrieb GmbH</h2>
      <div>Hofmannstraße 51 - Haus B</div>
      <div>81379 München</div>
      <div>
        <br />UST-Ident-Nr.: DE271427626<br />
        Handelsregisternummer: 183847<br />
        Registergericht: Amtsgericht München<br /><br />
        Fon: +49 (0) 89 / 4 52 54 - 5 25<br />
        Fax: +49 (0) 89 / 4 52 54 - 7 47<br />
        E-Mail: <a href="mailto:info@weltderwunder.de">info@weltderwunder.de</a
        ><br /><br />

        <strong>Geschäftsführer</strong>
        <br />Hendrik Hey<br /><br />

        <strong>Programmdirektor</strong><br />
        Hendrik Hey, VisdP<br /><br />

        <strong>Projektkoordination</strong><br />
        Esther Hey<br /><br />

        <strong>Jugendschutzbeauftragte</strong><br />
        Manuela Peter<br /><br />
      </div>

      <div>
        <br />
        <strong>Fragen/Kontakt</strong>
        <br />
        <a href="mailto:info@weltderwunder.de">info@weltderwunder.de</a>
      </div>

      <div>
        <br />
        <strong>Technische Abteilung IT<br /></strong>
        Welt der Wunder Sendebetrieb GmbH<br />
        Carl-Theodor-Reiffenstein-Platz 7<br />
        60313 Frankfurt am Main<br />
        Tel.: +49 (0) 69 27 27 5706<br /><br />
      </div>
      <h2>Ad Sales / TV-Vermarktung</h2>

      <div>
        Regina Sporleder<br />
        Director Sales<br />
        <a href="mailto:regina.sporleder@weltderwunder.de"
          >regina.sporleder@weltderwunder.de</a
        ><br />
        Tel.: 089-45254-722<br /><br />

        Vermarktung Sender, Marke, Digitale Projekte:<br />
        Welt der Wunder GmbH<br />
        <a href="mailto:vermarktung@weltderwunder.de"
          >vermarktung@weltderwunder.de</a
        >
      </div>
      <h2>Welt der Wunder Schweiz GmbH&nbsp;</h2>
      <div>Inwilerriedstrasse 25&nbsp;</div>
      <div>CH 6340 Baar<br /><br /></div>
      <div>
        <strong>Geschäftsführer: <br /></strong>
        Rainer Hastrich, Hendrik Hey
      </div>
      <div>
        <br />
      </div>
      <div>E-Mail: info@weltderwunder.ch<br /></div>
      <h2>Das Welt der Wunder Printmagazin</h2>
      <div>
        erscheint in der Heinrich Bauer Verlag KG,<br />
        Brieffach 2250, 20077 Hamburg,<br />
        Tel.: +49 (0) 40 / 3 01 94 - 2 77<br />
        Anregungen oder Fragen von Abonnenten des Magazins:<br />
        E-Mail: <a href="mailto:wdw@hbv.de">wdw@hbv.de<br /></a>
      </div>

      <h2>Videovermarktung Mobile + Smart TV</h2>

      <div class="image-page pull-">
        <img
          src="https://welt-der-wunder.s3.eu-central-1.amazonaws.com/migrated-pages-photos/csm_smartclip_Logo_RGB_72dpi_2c83255c62.jpg"
          alt=""
        />
      </div>

      <div>
        Smartclip AG<br />
        Fon: +49 40 68 87 687 - 0<br />
        <a href="mailto:info-germany@smartclip.com"
          >info-germany@smartclip.com</a
        >
        <br />Kleiner Burstah 12 | 20457 Hamburg<br /><br />
      </div>
      <div>
        <strong>Quellennachweis Bilder</strong>
        <br />© imago images&nbsp;<br />© iStockphoto
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layouts/AppLayout.vue";

export default {
  components: { AppLayout },
};
</script>

<style lang="scss">
.impressum {
  & > div {
    color: rgba(255, 255, 255, 0.72);
  }

  h2 {
    margin-top: 30px;
  }
}
</style>
