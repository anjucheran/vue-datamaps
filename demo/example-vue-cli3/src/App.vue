<template>
  <div id="app">
    <h2>Vue Datamaps Example</h2>
    <hr>
    <datamaps-basic/>
    <hr>
    <datamaps-state-label/>
    <hr>
    <datamaps-bubbles/>
    <hr>
    <datamaps-arcs/>
    <hr>
    <datamaps-graticules/>
    <hr>
    <datamaps-zoom/>
    <hr>
    <datamaps-south-korea/>
    <hr>
    <datamaps-custom-color/>
    <hr>
    <datamaps-aws-region-arc/>
    <hr>
    <datamaps-aws-region-bubble/>
  </div>
</template>

<script>
import DatamapsBasic from '@/components/DatamapsBasic'
import DatamapsStateLabel from '@/components/DatamapsStateLabel'
import DatamapsBubbles from '@/components/DatamapsBubbles'
import DatamapsArcs from '@/components/DatamapsArcs'
import DatamapsGraticules from '@/components/DatamapsGraticules'
import DatamapsZoom from '@/components/DatamapsZoom'
import DatamapsSouthKorea from '@/components/DatamapsSouthKorea'
import DatamapsCustomColor from '@/components/DatamapsCustomColor'
import DatamapsAwsRegionArc from '@/components/DatamapsAwsRegionArc'
import DatamapsAwsRegionBubble from '@/components/DatamapsAwsRegionBubble'
export default {
  name: 'home',
  components: {
    DatamapsBasic,
    DatamapsStateLabel,
    DatamapsBubbles,
    DatamapsArcs,
    DatamapsGraticules,
    DatamapsZoom,
    DatamapsSouthKorea,
    DatamapsCustomColor,
    DatamapsAwsRegionArc,
    DatamapsAwsRegionBubble
  }
}
</script>
