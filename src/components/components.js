/*export all components as plugin*/
import ImageView from "@/components/imageView/imageView.vue";
import SKU from "@/components/XtxSku/index.vue";
export const componentsPlugin = {
    install(app) {
        app.component("ImageView", ImageView)
        app.component("SKU", SKU)

    }
}