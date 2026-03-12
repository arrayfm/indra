import { RiHome2Line } from 'react-icons/ri'
import { StructureBuilder } from 'sanity/structure'
import { ConfigContext, DocumentStore } from 'sanity'

const content = ['page', 'article']
const types = ['resource']

export const structure = (
  S: StructureBuilder,
  context: ConfigContext & { documentStore: DocumentStore }
) =>
  S.list()
    .title('Content')
    .items([
      // --------------------- Content ---------------------
      ...S.documentTypeListItems().filter((listItem) =>
        content.includes(listItem.getId()?.toString() || '')
      ),
      // --------------------- Divider ---------------------
      S.divider(),
      // --------------------- Types ---------------------
      ...S.documentTypeListItems().filter((listItem) =>
        types.includes(listItem.getId()?.toString() || '')
      ),
      // --------------------- Divider ---------------------
      S.divider(),
      // --------------------- Settings ---------------------
      S.listItem()
        .title('Site Settings')
        .icon(RiHome2Line)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
    ])
