import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestEvent } from './events/restEvent';

@Controller('event/rest')
export class RestEventController {

    
    private events: { [id: string]: RestEvent } = {}; // Almacenar eventos en memoria para la prueba

    @Get('init')
    initRestEvent() {
  
        console.log(`se ha iniciado un nuevo evento tipo "descanso". ¿Quieres descansar? (se consumirán suministros).`)
        const event = new RestEvent();
        const eventId = `${event.step}-${Date.now()}`; // Generar un ID único
        this.events[eventId] = event;  

        return {
            id: eventId,
            descripcion: "Has llegado a un área tranquila. ¿Quieres descansar? (se consumirán suministros)"
        };
      
    }

    @Post('resolve/:id')
    resolveForkEvent(@Param('id') id: string, @Body() body: { playerChoice: boolean }) {
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
