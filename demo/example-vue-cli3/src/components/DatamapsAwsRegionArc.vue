<template>
  <div>
    <h4>AWS Region Arcs:</h4>
    <vue-datamaps
        :geographyConfig="geographyConfig"
        :fills="fills"
        :arcConfig="arcConfig"
        arc
        aws-regions
        :awsRegionsConfig="awsRegionsConfig"
        @custom:popup-arc="popupTemplate"
    >
      <div slot="hoverArcInfo" class="hoverinfo">
        <strong>{{ popupData.title }}</strong><br>
        {{ popupData.origin }} ▶▶▶ {{ popupData.destination }}
      </div>
    </vue-datamaps>
  </div>
</template>

<script>
import { VueDatamaps } from '../../../../src'
export default {
  components: {
    VueDatamaps
  },
  data () {
    return {
      geographyConfig: {
        borderWidth: 0.2,
        dataUrl: 'https://raw.githubusercontent.com/Seungwoo321/vue-datamaps/master/demo/example-vue-cli3/public/data/world.json',
        popupOnHover: false,
        highlightOnHover: false
      },
      fills: {
        defaultFill: '#9fabaf',
        active: '#e8762e'
      },
      awsRegionsConfig: {
        popupOnHover: true,
        borderColor: '#e8762e',
        data: [
          {
            code: 'ap-northeast-2',
            fillKey: 'active'
          },
          {
            code: 'ap-northeast-1',
            fillKey: 'active'
          },
          {
            code: 'us-east-2',
            fillKey: 'active'
          },
          {
            code: 'ap-southeast-1',
            fillKey: 'active'
          },
          {
            code: 'ca-central-1',
            fillKey: 'active'
          }
        ]
      },
      arcConfig: {
        popupOnHover: true,
        popupTemplate: true,
        data: [
          {
            origin: 'ap-northeast-1',
            destination: 'ap-northeast-2'
          },
          {
            origin: 'ap-southeast-1',
            destination: 'ap-northeast-2'
          },
          {
            origin: 'ap-southeast-2',
            destination: 'ap-northeast-1'
          },
          {
            origin: 'ca-central-1',
            destination: 'ap-northeast-2'
          },
          {
            origin: 'us-east-2',
            destination: 'ap-northeast-2'
          }
        ],
        strokeColor: '#e8762e',
        strokeWidth: 2,
        greatArc: true,
        animationSpeed: 2000
      },
      popupData: {
        title: 'DataTransfer',
        origin: '',
        destination: ''
      }
    }
  },
  methods: {
    popupTemplate (datum) {
      this.popupData.origin = datum.origin.full_name
      this.popupData.destination = datum.destination.full_name
    }
  }
}
</script>

<style>

</style>
