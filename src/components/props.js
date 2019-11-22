export default {
    props: {
        scope: {
            type: String,
            default: 'world'
        },
        responsive: {
            type: Boolean,
            default: false
        },
        aspectRatio: {
            type: Number,
            default: 0.5625
        },
        setProjection: {
            type: Function,
            default: function (d3, element) {
                let projection = null
                let path = null
                if (this.scope === 'usa') {
                    projection = d3.geoAlbersUsa()
                        .scale(this.svgWidth)
                        .translate([this.svgWidth / 2, this.svgHeight / 2])
                } else if (this.scope === 'world') {
                    projection = d3[`geo${this.projection}`]()
                        .scale((this.svgWidth + 1) / 2 / Math.PI)
                        .translate([this.svgWidth / 2, this.svgHeight / (this.projection === 'Mercator' ? 1.45 : 1.8)])
                }
                if (this.projection === 'Orthographic') {
                    this.svg.append('defs').append('path')
                        .datum({ type: 'Sphere' })
                        .attr('id', 'sphere')
                        .attr('d', path)

                    this.svg.append('use')
                        .attr('class', 'stroke')
                        .attr('xlink:href', '#sphere')

                    this.svg.append('use')
                        .attr('class', 'fill')
                        .attr('xlink:href', '#sphere')
                    projection.scale(this.svgWidth / Math.PI * 0.9).clipAngle(90).rotate(this.projectionConfigOptions.rotation)
                }

                path = d3.geoPath()
                    .projection(projection)
                return { projection, path }
            }
        },
        projection: {
            type: String,
            default: 'Equirectangular'
        },
        dataType: {
            type: String,
            default: 'json'
        },
        data: {
            type: Object,
            default: function () {
                return {}
            }
        },
        done: {
            type: Function,
            default: function () {
                return {}
            }
        },
        fills: {
            type: Object,
            default: function () {
                return {
                    authorHasTraveledTo: '#fa0fa0',
                    defaultFill: '#ABDDA4'
                }
            }
        },
        filters: {
            type: Object,
            default: function () {
                return {}
            }
        },
        geographyConfig: {
            type: Object
        },
        projectionConfig: {
            type: Object
        },
        bubblesConfig: {
            type: Object
        },
        bubbles: {
            type: Boolean,
            default: false
        },
        arcConfig: {
            type: Object
        },
        arc: {
            type: Boolean,
            default: false
        },
        disableDefaultStyles: {
            type: Boolean,
            default: false
        },
        labelsConfig: {
            type: Object
        },
        labels: {
            type: Boolean,
            default: false
        },
        popupTemplate: {
            type: Boolean,
            default: false
        },
        updateChoropleth: {
            type: Function,
            default: function (data, options) {
                const svg = this.svg

                // When options.reset = true, reset all the fill colors to the defaultFill and kill all data-info
                if (options && options.reset === true) {
                    svg.selectAll('.datamaps-subunit')
                        .transition().style('fill', this.fills.defaultFill)
                }

                for (const subunit in data) {
                    if (data.hasOwnProperty(subunit)) {
                        let color
                        const subunitData = data[subunit]
                        if (!subunit) {
                            continue
                        } else if (typeof subunitData === 'string') {
                            color = subunitData
                        } else if (typeof subunitData.color === 'string') {
                            color = subunitData.color
                        } else if (typeof subunitData.fillColor === 'string') {
                            color = subunitData.fillColor
                        } else {
                            color = this.fills[subunitData.fillKey]
                        }
                        this.$set(this.previousAttributes, data[subunit], this.styleAttributes[subunit] || {})
                        this.$set(this.styleAttributes, data[subunit], { fill: color })
                    }
                }
            }
        }
    },
    data () {
        return {
            defaultFill: '#ABDDA4',
            default: {
                geographyConfig: {
                    dataUrl: null,
                    hideAntarctica: true,
                    hideHawaiiAndAlaska: false,
                    borderWidth: 1,
                    borderOpacity: 1,
                    borderColor: '#FDFDFD',
                    popupOnHover: true,
                    highlightOnHover: true,
                    highlightFillColor: '#FC8D59',
                    highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
                    highlightBorderWidth: 2,
                    highlightBorderOpacity: 1,
                    highlightFillOpacity: 0.85
                },
                projectionConfig: {
                    rotation: [97, 0]
                },
                bubblesConfig: {
                    borderWidth: 2,
                    borderOpacity: 1,
                    borderColor: '#FFFFFF',
                    popupOnHover: true,
                    radius: null,
                    fillOpacity: 0.75,
                    animate: true,
                    highlightOnHover: true,
                    highlightFillColor: '#FC8D59',
                    highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
                    highlightBorderWidth: 2,
                    highlightBorderOpacity: 1,
                    highlightFillOpacity: 0.85,
                    exitDelay: 100,
                    key: JSON.stringify,
                    data: []
                },
                arcConfig: {
                    strokeColor: '#DD1C77',
                    strokeWidth: 1,
                    arcSharpness: 1,
                    animationSpeed: 600,
                    popupOnHover: false,
                    data: []
                },
                labelsConfig: {
                    fontSize: 10,
                    fontFamily: 'Verdana',
                    labelColor: '#000',
                    lineWidth: 1
                }
            }
        }
    },
    computed: {
        geograpphyConfigOptions () {
            return {
                ...this.default.geographyConfig,
                ...this.geographyConfig
            }
        },
        projectionConfigOptions () {
            return {
                ...this.default.projectionConfig,
                ...this.projectionConfig
            }
        },
        bubblesConfigOptions () {
            return {
                ...this.default.bubblesConfig,
                ...this.bubblesConfig,
                fills: this.fills
            }
        },
        arcConfigOptions () {
            return {
                ...this.default.arcConfig,
                ...this.arcConfig
            }
        },
        labelsConfigOptions () {
            return {
                ...this.default.labelsConfig,
                ...this.labelsConfig
            }
        }
    }
}
