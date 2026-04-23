-- ============================================================
-- Seed: 18 Artefactos del flujo MWT (ART-01 .. ART-18)
-- Tabla: api_artefacto
-- created_by_id = 1 (usuario Admin por defecto)
-- Generado por generate_seed.py — no editar a mano.
-- ============================================================

BEGIN;

-- ART-01: OC Cliente
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-01: OC Cliente',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0006","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0007","fields":[{"id":"field-0001","type":"select","label":"Expediente / Client ID","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Lista de clientes B2B activos\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"},{"id":"field-0005","type":"select","label":"Marca","options":[{"id":"opt-0002","label":"marluvas","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0003","label":"tecmater","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0004","label":"ranawalk","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0009","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0010","fields":[{"id":"field-0008","type":"code","label":"Líneas de Producto / Items","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Líneas extraídas del OCR o llenadas manualmente (SKU, cantidad, precio)\n# Esperado: lista de filas con columnas (sku, cantidad, precio, ...)\nrows = [\n    # {''sku'': ''SKU-001'', ''cantidad'': 1, ''precio'': 0.0},\n]\nreturn rows\n"}]}]},{"id":"section-0013","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0014","fields":[{"id":"field-0011","type":"number","label":"Total","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0015","fields":[{"id":"field-0012","type":"file","label":"Documento OC (PDF)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-02: Proforma MWT
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-02: Proforma MWT',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0018","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0019","fields":[{"id":"field-0016","type":"text","label":"Consecutivo (autogenerado, editable)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0020","fields":[{"id":"field-0017","type":"select","label":"Marca","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Marcas dinámicas desde catálogo\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0024","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0025","fields":[{"id":"field-0023","type":"radio","label":"Modo (Mode)","options":[{"id":"opt-0021","label":"COMISION","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0022","label":"FULL","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0027","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0028","fields":[{"id":"field-0026","type":"code","label":"Líneas de Producto","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Líneas de producto de la proforma\n# Esperado: lista de filas con columnas (sku, cantidad, precio, ...)\nrows = [\n    # {''sku'': ''SKU-001'', ''cantidad'': 1, ''precio'': 0.0},\n]\nreturn rows\n"}]}]},{"id":"section-0030","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0031","fields":[{"id":"field-0029","type":"number","label":"Montos Totales","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-03: Decisión B/C
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-03: Decisión B/C',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0036","permissions":{"view":"CEO&Admin","edit":"CEO&Admin"},"columns":[{"id":"col-0037","fields":[{"id":"field-0034","type":"radio","label":"Decisión de Modo","options":[{"id":"opt-0032","label":"COMISION","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0033","label":"FULL","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0038","fields":[{"id":"field-0035","type":"select","label":"Decidido por (Decided by)","options":[],"permissions":{"view":"CEO&Admin","edit":"CEO&Admin"},"dynamic":true,"language":"python","code":"# Lista CEO-ONLY (autocompletado)\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]}]}'::jsonb
);

-- ART-04: Confirmación SAP
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-04: Confirmación SAP',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0041","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0042","fields":[{"id":"field-0039","type":"text","label":"Número SAP (sap_id)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0043","fields":[{"id":"field-0040","type":"date","label":"Fecha de Fabricación Probable","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0045","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0046","fields":[{"id":"field-0044","type":"file","label":"Documento de Confirmación (PDF)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0048","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0049","fields":[{"id":"field-0047","type":"code","label":"Líneas Confirmadas","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Validación de cantidades contra la OC original\n# Esperado: lista de filas con columnas (sku, cantidad, precio, ...)\nrows = [\n    # {''sku'': ''SKU-001'', ''cantidad'': 1, ''precio'': 0.0},\n]\nreturn rows\n"}]}]}]}'::jsonb
);

-- ART-05: AWB/BL (Documento de Envío)
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-05: AWB/BL (Documento de Envío)',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0056","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0057","fields":[{"id":"field-0052","type":"radio","label":"Tipo de Documento","options":[{"id":"opt-0050","label":"awb","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0051","label":"bl","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0058","fields":[{"id":"field-0055","type":"radio","label":"Modo de Transporte (transport_mode)","options":[{"id":"opt-0053","label":"aéreo","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0054","label":"marítimo","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0065","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0066","fields":[{"id":"field-0061","type":"radio","label":"Modo de Flete (freight_mode)","options":[{"id":"opt-0059","label":"prepaid","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0060","label":"postpaid","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0067","fields":[{"id":"field-0064","type":"radio","label":"Gestión de Despacho (dispatch_mode)","options":[{"id":"opt-0062","label":"mwt","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0063","label":"client","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0069","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0070","fields":[{"id":"field-0068","type":"select","label":"Carrier","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Carriers filtrados por modo de transporte (aéreo|marítimo)\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0073","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0074","fields":[{"id":"field-0071","type":"code","label":"Origen y Destino","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Catálogo de orígenes/destinos\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0075","fields":[{"id":"field-0072","type":"text","label":"Tracking","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0077","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0078","fields":[{"id":"field-0076","type":"code","label":"Itinerario","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Sub-registros de segmentos con fechas (ETA/ETD por hop)\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0082","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0083","fields":[{"id":"field-0081","type":"radio","label":"Consolidación","options":[{"id":"opt-0079","label":"sí","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0080","label":"no","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-06: Cotización Flete
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-06: Cotización Flete',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0090","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0091","fields":[{"id":"field-0086","type":"radio","label":"Modo","options":[{"id":"opt-0084","label":"aéreo","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0085","label":"marítimo","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0092","fields":[{"id":"field-0089","type":"radio","label":"Modo de Flete (freight_mode)","options":[{"id":"opt-0087","label":"prepaid","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0088","label":"postpaid","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0094","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0095","fields":[{"id":"field-0093","type":"number","label":"Monto Cotizado","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-07: Aprobación Despacho
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-07: Aprobación Despacho',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0102","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0103","fields":[{"id":"field-0098","type":"radio","label":"Aprobado por","options":[{"id":"opt-0096","label":"client","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0097","label":"ceo","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0104","fields":[{"id":"field-0101","type":"radio","label":"Gestión de Despacho (dispatch_mode)","options":[{"id":"opt-0099","label":"mwt","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0100","label":"client","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-08: Documentación Aduanal
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-08: Documentación Aduanal',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0106","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0107","fields":[{"id":"field-0105","type":"code","label":"Partidas Arancelarias (NCM)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Lista de NCM aplicables (multi-select dinámico)\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0110","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0111","fields":[{"id":"field-0108","type":"number","label":"Porcentaje DAI (dai_pct)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0112","fields":[{"id":"field-0109","type":"code","label":"Permisos","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Lista de permisos aplicables (multi-select dinámico)\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]}]}'::jsonb
);

-- ART-09: Factura MWT
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-09: Factura MWT',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0115","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0116","fields":[{"id":"field-0113","type":"text","label":"ID de Factura","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0117","fields":[{"id":"field-0114","type":"select","label":"Moneda (Currency)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Catálogo de monedas: USD, BRL, CRC, ...\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0119","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0120","fields":[{"id":"field-0118","type":"number","label":"Total Vista Cliente (total_client_view)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-10: Factura Comisión
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-10: Factura Comisión',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0122","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0123","fields":[{"id":"field-0121","type":"number","label":"Monto de Comisión (visible solo si modo COMISION)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-11: Registro Costos
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-11: Registro Costos',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0126","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0127","fields":[{"id":"field-0124","type":"select","label":"Tipo de Costo (cost_type)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Clasificaciones de costos desde la BD\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0128","fields":[{"id":"field-0125","type":"number","label":"Monto (amount)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0137","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0138","fields":[{"id":"field-0129","type":"select","label":"Moneda (currency)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Catálogo de monedas\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0139","fields":[{"id":"field-0136","type":"select","label":"Fase Operativa (phase)","options":[{"id":"opt-0130","label":"REGISTRO","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0131","label":"PRODUCCION","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0132","label":"PREPARACION","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0133","label":"DESPACHO","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0134","label":"TRANSITO","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0135","label":"EN_DESTINO","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0141","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0142","fields":[{"id":"field-0140","type":"textarea","label":"Descripción","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-12: Nota Compensación
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-12: Nota Compensación',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0144","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0145","fields":[{"id":"field-0143","type":"code","label":"Ítems / Líneas","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Ítems/líneas afectados por la nota de compensación\n# Esperado: lista de filas con columnas (sku, cantidad, precio, ...)\nrows = [\n    # {''sku'': ''SKU-001'', ''cantidad'': 1, ''precio'': 0.0},\n]\nreturn rows\n"}]}]},{"id":"section-0147","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0148","fields":[{"id":"field-0146","type":"number","label":"Valor de Compensación","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-13: Recepción en nodo (Proceso)
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-13: Recepción en nodo (Proceso)',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0151","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0152","fields":[{"id":"field-0149","type":"select","label":"Transferencia Asociada (transfer_id)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Transferencias con destino a este nodo en estado in-transit\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0153","fields":[{"id":"field-0150","type":"select","label":"Nodo Destino","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Nodos activos del usuario\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0159","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0160","fields":[{"id":"field-0154","type":"date","label":"Fecha y Hora de Recepción","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0161","fields":[{"id":"field-0158","type":"radio","label":"Estado General de la Carga","options":[{"id":"opt-0155","label":"Óptimo","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0156","label":"Con Daños","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0157","label":"Faltantes","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0163","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0164","fields":[{"id":"field-0162","type":"code","label":"Líneas Recibidas (Reconciliación)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Extrae SKU y cantidad enviada del transfer; permite ingresar cantidad realmente recibida\n# Esperado: lista de filas con columnas (sku, cantidad, precio, ...)\nrows = [\n    # {''sku'': ''SKU-001'', ''cantidad'': 1, ''precio'': 0.0},\n]\nreturn rows\n"}]}]},{"id":"section-0167","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0168","fields":[{"id":"field-0165","type":"text","label":"Firma / Responsable de Bodega","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0169","fields":[{"id":"field-0166","type":"file","label":"Evidencia de Recepción (Guía firmada / Fotos)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-14: Preparación / Acondicionamiento (Proceso)
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-14: Preparación / Acondicionamiento (Proceso)',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0176","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0177","fields":[{"id":"field-0170","type":"select","label":"Expediente o Transferencia Asociada","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Expedientes/transferencias activas para preparación\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0178","fields":[{"id":"field-0175","type":"select","label":"Tipo de Acondicionamiento","options":[{"id":"opt-0171","label":"Etiquetado","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0172","label":"Re-empaque","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0173","label":"Consolidación","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0174","label":"Paletizado","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0180","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0181","fields":[{"id":"field-0179","type":"code","label":"SKUs a Acondicionar","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# SKUs presentes en el nodo que requieren preparación\n# Esperado: lista de filas con columnas (sku, cantidad, precio, ...)\nrows = [\n    # {''sku'': ''SKU-001'', ''cantidad'': 1, ''precio'': 0.0},\n]\nreturn rows\n"}]}]},{"id":"section-0184","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0185","fields":[{"id":"field-0182","type":"textarea","label":"Insumos Utilizados (cajas, stickers, etc.)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0186","fields":[{"id":"field-0183","type":"select","label":"Responsable de Preparación","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Operarios activos del nodo\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0191","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0192","fields":[{"id":"field-0190","type":"checkbox","label":"Checklist de Calidad","options":[{"id":"opt-0187","label":"Cajas selladas","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0188","label":"Stickers correspondientes a mercado","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0189","label":"Cantidades validadas","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-15: Despacho inter-nodo (Proceso)
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-15: Despacho inter-nodo (Proceso)',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0194","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0195","fields":[{"id":"field-0193","type":"select","label":"Transferencia Asociada (transfer_id)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Transferencias inter-nodo\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0198","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0199","fields":[{"id":"field-0196","type":"select","label":"Nodo Origen","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Nodos activos\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0200","fields":[{"id":"field-0197","type":"select","label":"Nodo Destino","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Nodos activos\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0203","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0204","fields":[{"id":"field-0201","type":"select","label":"Transportista Local / Carrier","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Proveedores logísticos locales\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0205","fields":[{"id":"field-0202","type":"text","label":"Placas / ID del Vehículo","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0208","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0209","fields":[{"id":"field-0206","type":"file","label":"Documento de Remisión (Waybill)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0210","fields":[{"id":"field-0207","type":"number","label":"Total de Bultos / Pallets Despachados","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-16: Transfer pricing approval (Pricing)
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-16: Transfer pricing approval (Pricing)',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0212","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0213","fields":[{"id":"field-0211","type":"select","label":"Transferencia Asociada","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Transferencias con cambio de ownership\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0216","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0217","fields":[{"id":"field-0214","type":"select","label":"Entidad Legal Origen (Issuer)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Entidades legales activas\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0218","fields":[{"id":"field-0215","type":"select","label":"Entidad Legal Destino (Receiver)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Entidades legales activas\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0220","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0221","fields":[{"id":"field-0219","type":"select","label":"Política de Precio Aplicada","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Políticas derivadas del NodeContract\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0223","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0224","fields":[{"id":"field-0222","type":"code","label":"Desglose de Costos y Markup","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Cálculo de transfer price = costo FOB + reglas del NodeContract\n# Esperado: lista de filas con columnas (sku, cantidad, precio, ...)\nrows = [\n    # {''sku'': ''SKU-001'', ''cantidad'': 1, ''precio'': 0.0},\n]\nreturn rows\n"}]}]},{"id":"section-0227","permissions":{"view":"CEO&Admin","edit":"CEO&Admin"},"columns":[{"id":"col-0228","fields":[{"id":"field-0225","type":"number","label":"Monto Total de Transferencia","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0229","fields":[{"id":"field-0226","type":"select","label":"Aprobado por","options":[],"permissions":{"view":"CEO&Admin","edit":"CEO&Admin"},"dynamic":true,"language":"python","code":"# Restringido a CEO-ONLY\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]}]}'::jsonb
);

-- ART-17: Documento de excepción (Documento)
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-17: Documento de excepción (Documento)',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0235","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0236","fields":[{"id":"field-0233","type":"radio","label":"Contexto de la Excepción","options":[{"id":"opt-0230","label":"Expediente","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0231","label":"Transferencia","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0232","label":"Inventario Físico","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0237","fields":[{"id":"field-0234","type":"select","label":"Referencia (ID del Expediente/Transfer/Lote)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Lista filtrada según el contexto seleccionado\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0249","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0250","fields":[{"id":"field-0243","type":"select","label":"Tipo de Excepción","options":[{"id":"opt-0238","label":"Faltante en recepción","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0239","label":"Daño de producto","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0240","label":"Retraso Logístico Crítico","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0241","label":"Rechazo Aduanal","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0242","label":"Error de Tallas","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0251","fields":[{"id":"field-0248","type":"radio","label":"Nivel de Severidad","options":[{"id":"opt-0244","label":"Baja","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0245","label":"Media","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0246","label":"Alta","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0247","label":"Crítica","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0253","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0254","fields":[{"id":"field-0252","type":"textarea","label":"Descripción del Incidente","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0257","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0258","fields":[{"id":"field-0255","type":"file","label":"Evidencia (Fotos / Correos)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]},{"id":"col-0259","fields":[{"id":"field-0256","type":"textarea","label":"Acción Correctiva / Compensación Sugerida","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

-- ART-18: Reporte operativo (Reporte)
INSERT INTO api_artefacto (title, created_by_id, status, created_at, updated_at, structure_json) VALUES (
  'ART-18: Reporte operativo (Reporte)',
  1,
  'Published',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  '{"sections":[{"id":"section-0265","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0266","fields":[{"id":"field-0260","type":"select","label":"Nodo a Reportar","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Nodos activos del usuario\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0267","fields":[{"id":"field-0264","type":"select","label":"Período del Reporte","options":[{"id":"opt-0261","label":"Diario","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0262","label":"Semanal","permissions":{"view":"all","viewRoles":""}},{"id":"opt-0263","label":"Mensual","permissions":{"view":"all","viewRoles":""}}],"permissions":{"view":"Todos","edit":"Todos"}}]}]},{"id":"section-0269","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0270","fields":[{"id":"field-0268","type":"code","label":"Métricas de Ocupación y Capacidad","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Calcula % de uso del nodo (capacidad vs ocupado)\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0272","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0273","fields":[{"id":"field-0271","type":"code","label":"Volumen Despachado / Recibido","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Consolida líneas procesadas en el período\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0275","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0276","fields":[{"id":"field-0274","type":"code","label":"Alertas Activas del Nodo","options":[],"permissions":{"view":"Todos","edit":"Todos"},"language":"python","code":"# Trae alertas del motor de automatización\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]}]},{"id":"section-0279","permissions":{"view":"Todos","edit":"Todos"},"columns":[{"id":"col-0280","fields":[{"id":"field-0277","type":"select","label":"Generado por (Operador del Nodo)","options":[],"permissions":{"view":"Todos","edit":"Todos"},"dynamic":true,"language":"python","code":"# Operadores activos del nodo\n# Este bloque se ejecuta en el preview/server y debe devolver\n# el dataset que poblará el campo (lista de dicts u opciones).\nresult = []\nreturn result\n"}]},{"id":"col-0281","fields":[{"id":"field-0278","type":"file","label":"Reporte Físico / Excel Adjunto (Opcional)","options":[],"permissions":{"view":"Todos","edit":"Todos"}}]}]}]}'::jsonb
);

COMMIT;
