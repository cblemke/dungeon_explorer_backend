import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ForkEvent, ForkType } from './events/forkEvent';
import { TrapEvent } from './events/trapEvent';

@Controller('event/trap')
export class TrapEventController {

    
    private events: { [id: string]: TrapEvent } = {}; // Almacenar eventos en memoria para la prueba

    @Get('init')
    initForkEvent() {  
        console.log(`se ha iniciado un nuevo evento tipo "trampa". ¿Quién la desactivará?.`)
        const event = new TrapEvent();
        const eventId = `${event.step}-${Date.now()}`; // Generar un ID único
        this.events[eventId] = event;  

        return {
            id: eventId,
            descripcion: `Habéis detectado una trampa peligrosa que impide el paso... ¿quién la desactivará?`
        };        
    }

  
  
    @Post('resolve/:id')
    resolveForkEvent(@Param('id') id: string, @Body() body: { playerChoice: string }) {
      const event = this.events[id];
  
      if (!event) {
        return { message: 'Evento no encontrado.' };
      }

      if (event.isCompleted) {
        return { message: 'El evento se ha completado y no se puede repetir' };
      }
  
      const result = event.resolve(body.playerChoice);
        
      return {
        message: result,
        isCompleted: event.isCompleted,
      }; 
    }    
}
