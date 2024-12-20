import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next)
.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                login: 'Log In',
                email: 'Email',
                password: 'Password',
                enter: 'Enter',
                number: 'Number',
                name: 'Name',
                phase: 'Phases',
                ephase: 'End Phase',
                ttime: 'Est. Time',
                Esttime: 'Estimated Time (min)',
                bleach: 'Bleach',
                addnew: 'Add New',
                formulas: 'Formulas',
                loading: 'Loading...',
                fdeleted: 'Formula was successfully deleted',
                fconfirm: 'Are you sure you want to delete this Formula?',
                nonspecified: 'Non-Specified',
                nobleach: 'No Bleach',
                yesnchorine: 'Yes (No chlorine)',
                yeswchorine: 'Yes (with chlorine)',
                fupdated: 'Formula was successfully updated',
                checkdata: 'Please check data input',
                fcreated: 'Formula was successfully created',
                delay: 'Delay 2 (s)',
                select: 'Select',
                uformulat: 'Update Formula',
                nformulat: 'New Formula',
                percentage: 'Percentage',
                formtype: 'Formula Type',
                temperature: 'Temperature',
                freemode: 'Free Mode',
                save: 'Save',
                addphase: '+ Add Phase',
                phasenum: 'Phase Number',
                phasetyp: 'Phase Type',
                delay1: 'Delay 1',
                delay1p: 'Delay 1 (s)',
                delicate: 'Delicate',
                normal: 'Normal',
                hevaysoil: 'Heavy soil',
                reprocess: 'Re-process',
                desize: 'Desize',
                rinsespin: 'Rinse/Spinning',
                recovery: 'Recovery',
                other: 'Other',
                cold: 'Cold',
                warm: 'Warm',
                hot: 'Hot',
                hightemp: 'High temperature',
                phase1: 'Phase',
                nphase1: 'Phase New',
                rphase1: 'Remove Phase',
                none: 'None',
                prewash: 'Pre-Wash',
                mwash: 'Main Wash',
                neutral: 'Neutralizing',
                netsotf: 'Neutr./Soft.',
                channels: 'Channels',
                washers: 'Washers',
                calibration: 'Calibration',
                rtv: 'Real Time View',
                advanced: 'Advanced',
                nacalibration: 'Calibration not available Try later.',
                parameters: 'Parameters',
                sparameters: 'Calibration parameters sent successfully.',
                mode: 'Mode',
                water: 'Water',
                product: 'Product',
                channel: 'Channel',
                schannel: 'Select a Channel first',
                sproduct: 'Select a Product first',
                smode: 'Select a mode first',
                destination: 'Destination',
                sdestination: 'Select a Destination first',
                confirm: 'Confirm',
                currentkf: 'Current KF',
                currentfr: 'Current Flow Rate',
                time: 'Time (s)',
                pulses: 'Pulses',
                estvolume: 'Estimated Volume',
                obvolume: 'Obtained Volume',
                process: 'Process',
                ccalibration: 'Calibration cleaning sent successfully.',
                cleaning: 'Cleaning',
                progress: 'Progress',
                close: 'Close',
                genericupdate: 'Update was successfully',
                connections: 'Connections',
                networkid: 'Network ID',
                metricunit: 'Metric Units',
                metric: 'Metric',
                imperial: 'Imperial/US',
                language: 'Language',
                formulanum: 'Formula Num.',
                formulaname: 'Formula Name',
                washercustomer: 'Washer Customer',
                phasestatus: 'Phase Status',
                finish: 'Finish',
                pause: 'Pause',
                wstatusdet: 'Washer Status Detail',
                nostatus: 'Status Not Available',
                formulanumber: 'Formula Number',
                customer: 'Customer',
                latestdosage: 'Latest Dosages',
                dateandtime: 'Date and Time',
                estvol: 'Est. Vol.',
                dose: 'Dose',
                realvol: 'Real. Vol.',
                esttim: 'Est. Tim.',
                realtim: 'Real. Tim.',
                latestalarms: 'Latest Alarms',
                alarm: 'Alarm',
                cycle: 'Cycle',
                timesignal: 'Time of the Signal',
                pausemodeno: 'No',
                pausemodewq: 'While in queue',
                pausemodewqd: 'While in queue & dosage',
                signal: 'Signal',
                sequential: 'Sequential',
                notfound: '404-Not Found',
                washerc: 'washer was successfully created',
                washeru: 'washer was successfully updated',
                cwasherd: 'Are you sure you want to delete this Washer?',
                washerd: 'Washer was successfully deleted',
                wdetailupdate: 'Washer Detail/Update',
                newwasher: 'New Washer',
                loadkg: 'Load (Kg)',
                loadlbs: 'Load (lbs)',
                loadselector: 'load Selector',
                flushl: 'Flush (l)',
                flushgal: 'Flush (gal)',
                Flushat: 'Flush Air Time (s)',
                formulaid: 'Formula ID',
                Fselector: 'F. Selector',
                timeofsignal8: 'Time of Signal 8',
                timeofsignal18: 'Time of signals 1+8',
                binary: 'Binary',
                free: 'Free',
                dosesphaseonID: 'Dosed Phase on ID',
                phasetriggermode: 'Phase Trigger mode',
                selectordefformulae: 'Selector default Formula',
                loadunload: 'Loading / Unloading Time (min)',
                signalfilters: 'Signal Filters (s)',
                minimuntime: 'Minimun Time',
                lockaftersignal: 'Lock after signal',
                lockafterend: 'Lock after end',
                machinepause: 'Machine Pause',
                alarmreporting: 'Alarm Reporting',
                missingphases: 'Missing Phases',
                internalerror: 'Internal Error',
                unfinishedprocess: 'Unfinished Process',
                leveltimeout: 'Level / Temp. Timeout',
                commerror: 'Comm. Error',
                dataoutrange: 'Data out of Range',
                updatechannel: 'Update Channel',
                newchannel: 'New channel',
                channelu: 'channel was successfully updated',
                channelc: 'channel was successfully created',
                cchanneld: 'Are you sure you want to delete this Channel?',
                channeld: 'Channel was successfully deleted',
                watercontrol: 'Water Control',
                controlmode: 'Control Mode',
                jtime: 'Time',
                flowmeter: 'Flow meter',
                flowmetertype: 'Flow Meter Type',
                paddlewheel: 'Paddle Wheel',
                ovalgears: 'Oval Gears',
                costgal: 'Cost/gal',
                costl: 'Cost/l',
                kfpoz: 'Kf (fl.oz / pulse)',
                kfpml: 'Kf (ml / pulse)',
                flowrateoz: 'Flow rate (fl.oz / min)',
                flowratel: 'Flow rate (l / min)',
                dosage: 'Dosage',
                pumptype: 'Pump Type',
                Peristaltic: 'Peristaltic',
                Motor: 'Motor',
                Pneumatic: 'Pneumatic',
                Membrane: 'Membrane',
                Venturi: 'Venturi',
                Pneumaticpp: 'Pneumatic (p/p)',
                Motorpp: 'Motor (p/p)',
                flushtype: 'Flush Type',
                noflush: 'No Flush',
                wateronly: 'Water only',
                airflush: 'Air Flush',
                watertestoz: 'Water Test (fl.oz)',
                watertestml: 'Water Test (ml)',
                initialtestretry: 'Initial Test Retry',
                leaktest: 'Leak Test',
                flushbypump: 'Flush By Pump',
                alarms: 'Alarms',
                pulsedetctionrange: 'Pulse detection range',
                low: 'low',
                medium: 'Medium',
                high: 'High',
                maximun: 'Maximun',
                attempbeforewarning: 'Attempts before warning',
                Creation: 'Creation',
                LastModification: 'Last Modification',
                products: 'Products',
                pumpspeed: 'Pump Speed',
                stocksolution: 'Stock Solution',
                noprodavai: 'No products available.',
                by: 'by',
                productu: 'product was successfully updated',
                productc: 'product was successfully created',
                dproductc: 'Are you sure you want to delete this Porduct?',
                productud: 'Product was successfully deleted',
                Properties: 'Properties',
                specificgravity: 'Specific Gravity',
                density: 'Density (g / cc)',
                Concentration: 'Concentration (%)',
                pricepergal: 'Price per gal',
                priceperkg: 'Price per kg',
                state: 'State',
                liquid: 'Liquid',
                dosageretry: 'Dosage Retry',
                levelprovecont: 'Level prove contact',
                Open: 'Open',
            }
        },
        es: {
            translation: {
                login: 'Iniciar Sesión',
                email: 'Correo',
                password: 'Contraseña',
                enter: 'Entrar',
                number: 'Número',
                name: 'Nombre',
                phase: 'Fases',
                ephase: 'Fase Final',
                ttime: 'Tiempo Est.',
                Esttime: 'Tiempo Estimado (min)',
                bleach: 'Blanqueador',
                addnew: 'Agregar',
                formulas: 'Fórmulas',
                loading: 'Cargando...',
                fdeleted: 'Fórmula elimanada Exitosamente',
                fconfirm: 'Desea Eliminar esta Fórmula?',
                nonspecified: 'No-Especificado',
                nobleach: 'Sin Blanqueador',
                yesnchorine: 'Sí (sin cloro)',
                yeswchorine: 'Sí (con cloro)',
                fupdated: 'Fórmula Actualizada exitosamente',
                checkdata: 'Por favor verificar datos ingresados',
                fcreated: 'Fórmula creada exitosamente',
                delay: 'Retardo 2 (s)',
                select: 'Seleccionar',
                uformulat: 'Actualizar Fórmula',
                nformulat: 'Nueva Fórmula',
                percentage: 'Porcentaje',
                formtype: 'Tipo de Formula',
                temperature: 'Temperatura',
                freemode: 'Modo libre',
                save: 'Guardar',
                addphase: '+ Agregar Fase',
                phasenum: 'Número de Fase',
                phasetyp: 'Tipo de Fase',
                delay1: 'Retardo 1',
                delay1p: 'Retardo 1 (s)',
                delicate: 'Delicado',
                normal: 'Normal',
                hevaysoil: 'Lavado Intenso',
                reprocess: 'Reprocesar',
                desize: 'Desdimensionar',
                rinsespin: 'Enjuague/centrifugado',
                recovery: 'Recuperación',
                other: 'Otro',
                cold: 'Frio',
                warm: 'Tibio',
                hot: 'Caliente',
                hightemp: 'Altas Temperaturas',
                phase1: 'Fase',
                nphase1: 'Nueva Fase',
                rphase1: 'Eliminar Fase',
                none: 'Ninguna',
                prewash: 'Pre-Lavado',
                mwash: 'Lavado principal',
                neutral: 'Neutralizante',
                netsotf: 'Neutr./Suave.',
                blank: 'Blanco',
                channels: 'Canales',
                washers: 'Lavadoras',
                calibration: 'Calibración',
                rtv: 'Vista En Tiempo Real',
                advanced: 'Avanzado',
                nacalibration: 'Calibración no disponible, intente luego.',
                parameters: 'Parametros',
                sparameters: 'Parametros de calibracion enviados exitosamente.',
                mode: 'Modo',
                water: 'Agua',
                product: 'Producto',
                channel: 'Canal',
                schannel: 'Selecciona un canal primero',
                sproduct: 'Selecciona un producto primero',
                smode: 'Selecciona un modo primero',
                destination: 'Destino',
                sdestination: 'Selecciona un Destino primero',
                confirm: 'Confirmar',
                currentkf: 'KF actual',
                currentfr: 'Caudal Actual',
                time: 'Tiempo (s)',
                pulses: 'Pulsos',
                estvolume: 'Volumen Estimado',
                obvolume: 'Volumen Obtenido',
                process: 'Proceso',
                ccalibration: 'Limpieza de calibración enviada exitosamente.',
                cleaning: 'Limpieza',
                progress: 'Progreso',
                close: 'Cerrar',
                genericupdate: 'Actualizacion enviada exitosamente',
                connections: 'Conexiones',
                networkid: 'Nombre de la  Red',
                metricunit: 'Unidades Métricas',
                metric: 'Métricas',
                imperial: 'Imperial/US',
                language: 'Idioma',
                formulanum: 'Num. Fórmula',
                formulaname: 'Nombre Fórmula',
                washercustomer: 'Lavadora de Cliente',
                phasestatus: 'Estado de Fase',
                finish: 'Finalizado',
                pause: 'Pausa',
                wstatusdet: 'Estado Detallado Lavadora',
                nostatus: 'Estado no disponible',
                formulanumber: 'Numero de Formula',
                customer: 'Cliente',
                latestdosage: 'Ultimas Dosis',
                dateandtime: 'Fecha y Hora',
                estvol: 'Vol. Est.',
                dose: 'Dosis',
                realvol: 'Vol. Real',
                esttim: 'Tiempo Est.',
                realtim: 'Tiempo Real',
                latestalarms: 'Ultimas Alarmas',
                alarm: 'Alarma',
                cycle: 'Ciclo',
                timesignal: 'Tiempo de la señal',
                pausemodeno: 'No',
                pausemodewq: 'Mientras esta en Cola',
                pausemodewqd: 'Mientras esta en Cola y Dosificación',
                signal: 'Señal',
                sequential: 'Secuencial',
                notfound: '404 No Encontrado',
                washerc: 'Lavadora creada exitosamente',
                washeru: 'Lavadora actualizada exitosamente',
                cwasherd: 'Desea Eliminar esta lavadora?',
                washerd: 'Lavadora borrada exitosamente',
                wdetailupdate: 'Lavadora Detalles/Actualizar',
                newwasher: 'Nueva Lavadora',
                loadkg: 'Carga (Kg)',
                loadlbs: 'Carga (lbs)',
                loadselector: 'load Selector',
                flushl: 'Enjuague (l)',
                flushgal: 'Enjuague (gal)',
                Flushat: 'Tiempo de Aireado (s)',
                formulaid: 'ID de fórmula',
                Fselector: 'Selector de Fórmula',
                timeofsignal8: 'Tiempo de señal 8',
                timeofsignal18: 'Tiempo de señales 1+8',
                binary: 'Binario',
                free: 'Libre',
                dosesphaseonID: 'Fase dosificada en ID',
                phasetriggermode: 'Modo de disparo de fase',
                selectordefformulae: 'Selector predeterminado de Fórmula',
                loadunload: 'Tiempo de Carga / Descarga (min)',
                signalfilters: 'Filtro de señales (s)',
                minimuntime: 'Tiempo minimo',
                lockaftersignal: 'Bloquear despues de la señal',
                lockafterend: 'Bloquear despues de finalizar',
                machinepause: 'Pausa de la Maquina',
                alarmreporting: 'Reporte de Alarmas',
                missingphases: 'Fases Faltantes',
                internalerror: 'Error Interno',
                unfinishedprocess: 'Procesos sin Finalizar',
                leveltimeout: 'Nivel / Temp. Tiempo Fuera',
                commerror: 'Error Comunicaciones',
                dataoutrange: 'Datos fuera de rango',
                updatechannel: 'Actaulizar Canal',
                newchannel: 'Nuevo Canal',
                channelu: 'canal actualizado correctamente',
                channelc: 'canal creado exitosamente',
                cchanneld: 'eliminar el canal?',
                channeld: 'canal borrado exitosamente',
                watercontrol: 'Control de Agua',
                controlmode: 'Modo de Control',
                jtime: 'Tiempo',
                flowmeter: 'Medidor de Flujo',
                flowmetertype: 'Tipo de medidor de Flujo',
                paddlewheel: 'Rueda de Paleta',
                ovalgears: 'Engranaje Ovalado',
                costgal: 'Costo/gal',
                costl: 'Costo/l',
                kfpoz: 'Kf (fl.oz / pulso)',
                kfpml: 'Kf (ml / pulso)',
                flowrateoz: 'Tasa de Flujo (fl.oz / min)',
                flowratel: 'Tasa de Flujo (l / min)',
                dosage: 'Dosis',
                pumptype: 'Tipo de Bomba',
                Peristaltic: 'Peristaltica',
                Motor: 'Motor',
                Pneumatic: 'Neumatica',
                Membrane: 'Membrane',
                Venturi: 'Venturi',
                Pneumaticpp: 'Neumatica (p/p)',
                Motorpp: 'Motor (p/p)',
                flushtype: 'Tipo de Arrastre',
                noflush: 'Sin Arrastre',
                wateronly: 'Solo Agua',
                airflush: 'Arrastre de Aire',
                watertestoz: 'Prueba de Agua (fl.oz)',
                watertestml: 'Prueba de Agua (ml)',
                initialtestretry: 'Reintento de prueba inicial',
                leaktest: 'Prueba de Fugas',
                flushbypump: 'Arrastre por Bomba',
                alarms: 'Alarmas',
                pulsedetctionrange: 'Detección de Rango de Pulso',
                low: 'Bajo',
                medium: 'Medio',
                high: 'Alto',
                maximun: 'Maximo',
                attempbeforewarning: 'Intentos antes de Advertencia',
                Creation: 'Creación',
                LastModification: 'Última Modificación',
                products: 'Productos',
                pumpspeed: 'Velocidad de la Bomba',
                stocksolution: 'Solución en Reserva',
                noprodavai: 'No productos disponible',
                by: 'por',
                productu: 'Product exitosamente Actualizado',
                productc: 'Product exitosamente Creado',
                dproductc: 'Eliminar este Producto?',
                productud: 'Producto eliminado exitosamente',
                Properties: 'Propiedades',
                specificgravity: 'Gravedad específica',
                density: 'Densidad (g / cc)',
                Concentration: 'Concentración (%)',
                pricepergal: 'Precio por Galón',
                priceperkg: 'Precio por KG',
                state: 'Estado',
                liquid: 'Liquido',
                dosageretry: 'Reintento de dosificación',
                levelprovecont: 'Contacto prueba de nivel',
                Open: 'Abrir',
            }
        },
    },
  });

export default i18n;